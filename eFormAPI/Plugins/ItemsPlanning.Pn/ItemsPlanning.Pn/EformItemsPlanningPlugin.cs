/*
The MIT License (MIT)

Copyright (c) 2007 - 2019 Microting A/S

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

using System;
using System.Collections.Generic;
using System.Reflection;
using ItemsPlanning.Pn.Abstractions;
using ItemsPlanning.Pn.Infrastructure.Data.Seed;
using ItemsPlanning.Pn.Infrastructure.Data.Seed.Data;
using ItemsPlanning.Pn.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microting.eFormApi.BasePn;
using Microting.eFormApi.BasePn.Infrastructure.Database.Extensions;
using Microting.eFormApi.BasePn.Infrastructure.Models.Application;
using Microting.eFormApi.BasePn.Infrastructure.Settings;
using Microting.ItemsPlanningBase.Infrastructure.Data;
using Microting.ItemsPlanningBase.Infrastructure.Data.Factories;

namespace ItemsPlanning.Pn
{
    using Infrastructure.Models.Settings;

    public class EformItemsPlanningPlugin : IEformPlugin
    {
        public string Name => "Microting Items Planning Plugin";
        public string PluginId => "eform-angular-itemsplanning-plugin";
        public string PluginPath => PluginAssembly().Location;
        private string _connectionString;

        public Assembly PluginAssembly()
        {
            return typeof(EformItemsPlanningPlugin).GetTypeInfo().Assembly;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IItemsPlanningLocalizationService, ItemsPlanningLocalizationService>();
            services.AddTransient<IItemsPlanningPnSettingsService, ItemsPlanningPnSettingsService>();
            services.AddTransient<IItemsPlanningReportService, ItemsPlanningReportService>();
            services.AddTransient<IExcelService, ExcelService>();
            services.AddTransient<IItemsListService, ItemsListService>();
            services.AddSingleton<IRebusService, RebusService>();
        }

        public void AddPluginConfig(IConfigurationBuilder builder, string connectionString)
        {
            var seedData = new ItemsPlanningConfigurationSeedData();
            var contextFactory = new ItemsPlanningPnContextFactory();
            builder.AddPluginConfiguration(
                connectionString, 
                seedData, 
                contextFactory);
        }

        public void ConfigureOptionsServices(
            IServiceCollection services, 
            IConfiguration configuration)
        {
            services.ConfigurePluginDbOptions<ItemsPlanningBaseSettings>(
                configuration.GetSection("ItemsPlanningBaseSettings"));
        }

        public void ConfigureDbContext(IServiceCollection services, string connectionString)
        {
            _connectionString = connectionString;
            if (connectionString.ToLower().Contains("convert zero datetime"))
            {
                services.AddDbContext<ItemsPlanningPnDbContext>(o => o.UseMySql(connectionString,
                    b => b.MigrationsAssembly(PluginAssembly().FullName)));
            }
            else
            {
                services.AddDbContext<ItemsPlanningPnDbContext>(o => o.UseSqlServer(connectionString,
                    b => b.MigrationsAssembly(PluginAssembly().FullName)));
            }

            ItemsPlanningPnContextFactory contextFactory = new ItemsPlanningPnContextFactory();
            var context = contextFactory.CreateDbContext(new[] {connectionString});
            context.Database.Migrate();

            // Seed database
            SeedDatabase(connectionString);
        }

        public void Configure(IApplicationBuilder appBuilder)
        {
            var serviceProvider = appBuilder.ApplicationServices;
            IRebusService rebusService = serviceProvider.GetService<IRebusService>();
            rebusService.Start(_connectionString);

        }

        public MenuModel HeaderMenu(IServiceProvider serviceProvider)
        {
            var localizationService = serviceProvider
                .GetService<IItemsPlanningLocalizationService>();

            var result = new MenuModel();
            result.LeftMenu.Add(new MenuItemModel()
            {
                Name = localizationService.GetString("ItemsPlanning"),
                E2EId = "items-planning-pn",
                Link = "",
                MenuItems = new List<MenuItemModel>()
                {
                    new MenuItemModel()
                    {
                        Name = localizationService.GetString("Lists"),
                        E2EId = "items-planning-pn-lists",
                        Link = "/plugins/items-planning-pn/lists",
                        Position = 0,
                    },
                    new MenuItemModel()
                    {
                        Name = localizationService.GetString("Settings"),
                        E2EId = "items-planning-pn-settings",
                        Link = "/plugins/items-planning-pn/settings",
                        Position = 3,
                    }
                }
            });
            return result;
        }

        public void SeedDatabase(string connectionString)
        {
            // Get DbContext
            var contextFactory = new ItemsPlanningPnContextFactory();
            using (var context = contextFactory.CreateDbContext(new []{connectionString}))
            {
                // Seed configuration
                ItemsPlanningPluginSeed.SeedData(context);
            }
        }
    }
}