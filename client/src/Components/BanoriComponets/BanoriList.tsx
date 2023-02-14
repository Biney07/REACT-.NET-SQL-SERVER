import { Grid } from "@mui/material";
import { Banori } from "../../models/banori";
import { useAppSelector } from "../../Store/hook";
import BanoriCard from "./BanoriCard";
import BanoriCardSkeleton from "./BanoriCardSkeleton";

interface Props {
    banoret: Banori[];
}

export default function BanoriList({ banoret }: Props) {
    const { banoretLoaded } = useAppSelector(state => state.catalog);
    return (
        <Grid container spacing={4}>
            {banoret.map(banori => (
                <Grid item xs={4} key={banori.id}>
                    {!banoretLoaded ? (
                        <BanoriCardSkeleton />
                    ) : (
                        <BanoriCard Banori={banori} />
                    )}
                </Grid>
            ))}
        </Grid>
    )
}