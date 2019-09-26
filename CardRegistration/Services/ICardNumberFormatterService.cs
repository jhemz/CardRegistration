namespace CardRegistration.Services
{
    public interface ICardNumberFormatterService
    {
        string Format(string cardNumber);
    }
}