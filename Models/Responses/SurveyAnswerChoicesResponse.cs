using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Responses
{
    public class SurveyAnswerChoicesResponse<SurveyAnswerChoice> : SuccessResponse
    {
        public List<SurveyAnswerChoice> SurveyAnswerChoices { get; set; }
    }
}