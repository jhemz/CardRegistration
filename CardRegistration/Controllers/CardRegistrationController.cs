using CardRegistration.Models;
using CardRegistration.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CardRegistration.Controllers
{
    [Route("api/[controller]/[action]")]
    public class CardRegistrationController : Controller
    {
        private readonly ILuhnCheckerService _luhnCheckerService;
        private readonly IDateCheckerService _dateCheckerService;
        private readonly ICardNumberFormatterService _cardFormatterService;

        //this is only marked as static to preserve it, it would be stored securely ordinarily
        private static CardModel _cardModel;

        public CardRegistrationController(ILuhnCheckerService luhnCheckerService, IDateCheckerService dateCheckerService, ICardNumberFormatterService cardFormatterService)
        {
            _luhnCheckerService = luhnCheckerService;
            _dateCheckerService = dateCheckerService;
            _cardFormatterService = cardFormatterService;
        }

        [HttpPost]
        public ActionResult RegisterCard(CardModel card)
        {
            string result = "";
            bool allSuccesful = true;


            //verify card expiry
            if (!_dateCheckerService.VerifyExpiryDate(card.ExpiryDate))
            {
                allSuccesful = false;
                result += "invalid expiry date. ";
            }


            //verify card number
            if (!_luhnCheckerService.Validate(card.CardNumber))
            {
                allSuccesful = false;
                result += "invalid card number. ";
            }


            if (allSuccesful)
            {
                result = "Success!";
                _cardModel = card;
            }

            return Content(result);
        }


        [HttpGet]
        public string GetSummary()
        {
            //we will create a copy of the card to return, so we can control what is returned, excluding sensitive info server side
            CardModel card = new CardModel()
            {
                CardNumber = _cardFormatterService.Format(_cardModel.CardNumber),
                AddressLine1 = _cardModel.AddressLine1,
                Town = _cardModel.Town,
                Postcode = _cardModel.Postcode,
                ExpiryDate = _cardModel.ExpiryDate
            };

            


            return JsonConvert.SerializeObject(card);
        }

    }
}