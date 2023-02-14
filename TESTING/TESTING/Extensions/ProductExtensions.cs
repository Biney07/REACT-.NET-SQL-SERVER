using System.Collections.Generic;
using System.Linq;
using TESTING.Model;

namespace TESTING.Extensions
{
    public static class BanoriExtensions
    {
        public static IQueryable<Banori> Sort(this IQueryable<Banori> query, string orderBy)
        {
            if (string.IsNullOrEmpty(orderBy)) return query.OrderBy(p => p.Name);

            query = orderBy switch
            {
                "price" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                _ => query.OrderBy(p => p.Name)
            };

            return query;
        }

        public static IQueryable<Banori> Search(this IQueryable<Banori> query, string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm)) return query;

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(p => p.Name.ToLower().Contains(lowerCaseSearchTerm));
        }

        public static IQueryable<Banori> Filter(this IQueryable<Banori> query, string brands)
        {
            var profesioniList = new List<string>();
            

            if (!string.IsNullOrEmpty(brands))
                profesioniList.AddRange(brands.ToLower().Split(",").ToList());

            query = query.Where(p => profesioniList.Count == 0 || profesioniList.Contains(p.Profesioni.ToLower()));
            

            return query;
        }
    }
}