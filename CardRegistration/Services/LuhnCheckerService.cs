using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CardRegistration.Services
{
    public class LuhnCheckerService : ILuhnCheckerService
    {
        public bool Validate(string cardNumber)
        {
            bool result;

            //split the digits of the card number
            char[] numbers = cardNumber.ToCharArray();


            //sum the reversed odd digits
            int oddSum = 0;
            for (int i = numbers.Length -1; i >= 0; i -= 2)
            {
                oddSum += int.Parse(numbers[i].ToString());
            }

            //sum even digits
            int evenSum = 0;
            for (int i = numbers.Length - 2; i >= 0; i -= 2)
            {
                //get the value
                int value = 2 * int.Parse(numbers[i].ToString());
                //split its digits
                char[] digits = value.ToString().ToCharArray();
                //sum the digits and add to the evenSum
                foreach(char digit in digits)
                {
                    evenSum += int.Parse(digit.ToString());
                }
            }
            
            //check sum of both sums is divisible by 10
            if ((oddSum + evenSum) % 10 == 0)
            {
                result = true;
            }
            //if not, fail
            else
            {
                result = false;
            }

            return result;

        }
    }
}
