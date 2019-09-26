using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CardRegistration.Services
{
    public class CardNumberFormatterService : ICardNumberFormatterService
    {
        public string Format(string cardNumber)
        {
            string result = "";

            //perform check to make sure it is 16 digits long
            if (cardNumber.Length == 16)
            {
                result = "XXXX XXXX XXXX " + cardNumber.Substring(11, 4);
            }
            
            return result;
        }
    }
}
