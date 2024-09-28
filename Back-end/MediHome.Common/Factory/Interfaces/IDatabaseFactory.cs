using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediHome.Common.Factory.Interfaces
{
    public interface IDatabaseFactory
    {
        public IDbConnection Connection { get; }
        public IDbTransaction? Transaction { get; }
        void Begin();
        void Commit();
        void Rollback();
    }
}
