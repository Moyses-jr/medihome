using MediHome.Common.ErrorsResponse;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net;
using ILogger = Serilog.ILogger;

namespace MediHome.WebApi
{
    public class ExceptionFilter : IExceptionFilter
    {
        private readonly ILogger _logger;

        public ExceptionFilter(ILogger logger)
        {
            _logger = logger;
        }

        public class InternalServerErrorObjectResult : ObjectResult
        {
            public InternalServerErrorObjectResult(object error) : base(error)
            {
                StatusCode = StatusCodes.Status500InternalServerError;
            }
        }

        public void OnException(ExceptionContext context)
        {
            _logger.ForContext("WebApi", "StorageManager.WebApi")
                .ForContext("Route", context.HttpContext.Request.Path.Value)
                .ForContext("StackTrace", context.Exception)
                .Error(context.Exception.Message);

            var json = new AppError(
                context?.RouteData?.Values["controller"]?.ToString(),
                context?.Exception?.Message,
                context?.Exception?.ToString(),
                (int)HttpStatusCode.InternalServerError);

            context.Result = new InternalServerErrorObjectResult(json);
            context.HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            context.ExceptionHandled = true;
        }
    }
}
