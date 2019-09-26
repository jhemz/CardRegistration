using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CardRegistration.Services
{
    public interface ILuhnCheckerService
    {
        bool Validate(string cardNumber);
    }
}
