using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CardRegistration.Models
{
    public class CardModel
    {
        public string CardNumber { get; set; }
        public string CardHoldersName { get; set; }
        public string ExpiryDate { get; set; }
        public string AddressLine1 { get; set; }
        public string Town { get; set; }
        public string Postcode { get; set; }
    }
}
