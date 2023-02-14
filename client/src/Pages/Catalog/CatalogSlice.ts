
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../API/agent";
import { MetaData } from "../../models/pagination";
import { Banori, BanoriParams } from "../../models/banori";
import { RootState } from "../../Store/Store";

interface CatalogState {
    banoretLoaded: boolean;
    filtersLoaded: boolean;
    status: string;
    profesionet: string[];
    banoriParams: BanoriParams;
    metaData: MetaData | null;
}

const banoretAdapter = createEntityAdapter<Banori>();

function getAxiosParams(banoriParams: BanoriParams) {
    const params = new URLSearchParams();
    params.append('pageNumber', banoriParams.pageNumber.toString());
    params.append('pageSize', banoriParams.pageSize.toString());
    params.append('orderBy', banoriParams.orderBy);
    if (banoriParams.searchTerm) params.append('searchTerm', banoriParams.searchTerm);
    if (banoriParams.profesionet.length > 0) params.append('profesionet', banoriParams.profesionet.toString());

    return params;
}

export const fetchBanoretAsync = createAsyncThunk<Banori[], void, { state: RootState }>(
    'catalog/fetchBanoretAsync',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().catalog.banoriParams);
        try {
            const response = await agent.Catalog.list(params);
            thunkAPI.dispatch(setMetaData(response.metaData));
            return response.items;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const fetchBanoriAsync = createAsyncThunk<Banori, number>(
    'catalog/fetchBanoriAsync',
    async (banoriId, thunkAPI) => {
        try {
            return await agent.Catalog.details(banoriId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const fetchFilters = createAsyncThunk(
    'catalog/fetchFilters',
    async (_, thunkAPI) => {
        try {
            return agent.Catalog.fetchFilters();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

function initParams() {
    return {
        pageNumber: 1,
        pageSize: 6,
        orderBy: 'name',
        profesionet: [],

    }
}

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: banoretAdapter.getInitialState<CatalogState>({
        banoretLoaded: false,
        filtersLoaded: false,
        status: 'idle',
        profesionet: [],
        banoriParams: initParams(),
        metaData: null
    }),
    reducers: {
        setBanoriParams: (state, action) => {
            state.banoretLoaded = false;
            state.banoriParams = { ...state.banoriParams, ...action.payload, pageNumber: 1 };
        },
        setPageNumber: (state, action) => {
            state.banoretLoaded = false;
            state.banoriParams = { ...state.banoriParams, ...action.payload };
        },
        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },
        resetBanoriParams: (state) => {
            state.banoriParams = initParams();
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchBanoretAsync.pending, (state) => {
            state.status = 'pendingFetchBanoret';
        });
        builder.addCase(fetchBanoretAsync.fulfilled, (state, action) => {
            banoretAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.banoretLoaded = true;
        });
        builder.addCase(fetchBanoretAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchBanoriAsync.pending, (state) => {
            state.status = 'pendingFetchBanori';
        });
        builder.addCase(fetchBanoriAsync.fulfilled, (state, action) => {
            banoretAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchBanoriAsync.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle';
        });
        builder.addCase(fetchFilters.pending, (state) => {
            state.status = 'pendingFetchFilters';
        });
        builder.addCase(fetchFilters.fulfilled, (state, action) => {
            state.profesionet = action.payload.profesionet;

            state.filtersLoaded = true;
            state.status = 'idle';
        });
        builder.addCase(fetchFilters.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        })
    })
})

export const banoriSelectors = banoretAdapter.getSelectors((state: RootState) => state.catalog);

export const { setBanoriParams, resetBanoriParams, setMetaData, setPageNumber } = catalogSlice.actions;