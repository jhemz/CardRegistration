using System;

namespace CardRegistration.Services
{
    public interface IDateCheckerService
    {
        bool VerifyExpiryDate(string datetime);
    }
}