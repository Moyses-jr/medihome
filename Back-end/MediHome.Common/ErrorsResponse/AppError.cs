
namespace MediHome.Common.ErrorsResponse;

public class AppError
{// Based on RFC 7807 (https://datatracker.ietf.org/doc/html/rfc7807)
    public string Type { get; }
    public string Title { get; }
    public string Detail { get; }
    public int Status { get; }

    public AppError(string type, string title, string detail, int status = 400)
    {
        Type = type;
        Title = title;
        Detail = detail;
        Status = status;
    }
}
