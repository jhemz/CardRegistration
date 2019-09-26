using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CardRegistration.Services
{
    public class DateCheckerService : IDateCheckerService
    {
        public bool VerifyExpiryDate(string datetime)
        {
            bool result = false;

            string[] parts = Regex.Split(datetime, "/");

            if (parts.Length == 2)
            {
                //we will check agian to make sure values are numbers, already done in js, but just to be sure
                int month;
                bool monthIsNumeric = int.TryParse(parts[0], out month);

                int year;
                bool yearIsNumeric = int.TryParse(parts[1], out year);

                if(monthIsNumeric && yearIsNumeric)
                {
                    int fullYear = 2000 + year;

                    //I will assume that cards expire on the 1st of the month?
                    DateTime expiryDate = new DateTime(fullYear, month, 1);


                    if (DateTime.Now.AddYears(20) >= expiryDate && DateTime.Now <= expiryDate)
                    {
                        result = true;
                    }
                }
            }


            return result;
        }
    }
}
