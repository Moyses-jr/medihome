namespace MediHome.Common.Repository
{
    public interface ILocalDatabaseRepository
    {
        IDatabaseFactory LocalDatabase { get; }
    }

}
