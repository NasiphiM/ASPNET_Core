using System.Text.Json;
using API.Helpers;

namespace API.Extensions
{

    public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse res, PaginationHeader head)
        {
            var jsonOptions = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            res.Headers.Add("Pagination", JsonSerializer.Serialize(head, jsonOptions));
            res.Headers.Add("Access-Control-Expose-Header", "Pagination");
        }
    }
}
