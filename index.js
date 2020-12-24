function urlParameter(paramName) {
    var urlParams = new URLSearchParams(window.location.search);
    var paramValue = urlParams.get(paramName);
    return paramValue;
}

Survey.StylesManager.applyTheme("modern");

Survey.FunctionFactory
    .Instance
    .register("urlParameter", urlParameter);

var surveyDefinitionJson = {
    "pages": [
     {
      "name": "page1",
      "elements": [
       {
        "type": "text",
        "name": "name",
        "title": "What is your name (optional)"
       },
       {
        "type": "boolean",
        "name": "attendedWebinar",
        "visibleIf": "urlParameter('source') != 'webinar'",
        "title": "Did you attend our webinar?",
        "defaultValue": "false",
        "defaultValueExpression": "urlParameter('source') = 'webinar'"
       },
       {
        "type": "rating",
        "name": "webinarRating",
        "visibleIf": "{attendedWebinar} = true",
        "title": "Please rate the webinar you just attended"
       },
       {
        "type": "radiogroup",
        "name": "operatingSystem",
        "title": "Which operating system are you using?",
        "choices": [
         "macOS",
         "Windows",
         "Linux"
        ],
        "hasOther": true
       },
       {
        "type": "text",
        "name": "urlSource",
        "visible": false,
        "defaultValueExpression": " urlParameter('source')"
       }
      ]
     }
    ],
    "showQuestionNumbers": "off",
    "clearInvisibleValues": "none"
   };

   window.survey = new Survey.Model(surveyDefinitionJson);

   survey
    .onComplete
    .add(function (result) {
        document
            .querySelector('#surveyResult')
            .textContent = "Result JSON:\n" + JSON.stringify(result.data, null, 3);
    });

   $("#surveyElement").Survey({model: survey});