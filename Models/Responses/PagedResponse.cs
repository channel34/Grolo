using System.Collections.Generic;

namespace Sabio.Models.Responses
{
    public class PagedResponse<TItem>
    {
        public int TotalCount { get; set; }
        public List<TItem> PagedItems { get; set; }
    }
}
