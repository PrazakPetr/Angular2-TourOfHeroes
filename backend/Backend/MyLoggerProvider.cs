using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using Microsoft.Extensions.Logging;

namespace TohBackend
{
    public class MyLoggerProvider : ILoggerProvider
    {
        public static string[] _categories =
        {
            typeof(Microsoft.EntityFrameworkCore.Storage.IRelationalCommandBuilderFactory).FullName,
            typeof(Microsoft.EntityFrameworkCore.Storage.Internal.SqliteRelationalConnection).FullName,
        };

        public ILogger CreateLogger(string categoryName)
        {
            if (_categories.Contains(categoryName))
            {
                return new MyLogger();
            }

            return new NullLogger();
        }

        public void Dispose()
        { }

        private class MyLogger : ILogger
        {
            public bool IsEnabled(LogLevel logLevel)
            {
                return true;
            }

            public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
            {
                Debug.WriteLine("MY - " + formatter(state, exception));
            }

            public IDisposable BeginScope<TState>(TState state)
            {
                return null;
            }
        }

        private class NullLogger : ILogger
        {
            public bool IsEnabled(LogLevel logLevel)
            {
                return false;
            }

            public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
            { }

            public IDisposable BeginScope<TState>(TState state)
            {
                return null;
            }
        }
    }

}

