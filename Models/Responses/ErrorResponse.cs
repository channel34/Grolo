﻿using System;
using System.Collections.Generic;

namespace Sabio.Models.Responses
{
    public class ErrorResponse : BaseResponse
    {
        public List<String> Errors { get; set; }

        public ErrorResponse(string errMsg)
        {
            Errors = new List<string>();
            Errors.Add(errMsg);

            IsSuccessful = false;
        }

        public ErrorResponse(IEnumerable<String> errMsg)
        {
            Errors = new List<string>();
            Errors.AddRange(errMsg);

            IsSuccessful = false;
        }
    }
}