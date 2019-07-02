﻿using System.Collections.Generic;
using System.Linq;
using eFormData;
using ItemsPlanning.Pn.Infrastructure.Models.Report;
using Microting.ItemsPlanningBase.Infrastructure.Data.Entities;

namespace ItemsPlanning.Pn.Infrastructure.Helpers
{
    public static class ReportsHelper
    {
        public static ReportModel GetReportData(
            GenerateReportModel model, 
            Item item, 
            IEnumerable<ReplyElement> replies,
            MainElement template)
        {
            var finalModel = new ReportModel
            {
                Name = item.Name,
                Description = item.Description,
                DateFrom = model.DateFrom,
                DateTo = model.DateTo
            };

            // Go through template elements and get fields and options labels
            foreach (var element in template.ElementList)
            {
                if (!(element is DataElement dataElement)) 
                    continue;

                var dataItems = dataElement.DataItemList;

                foreach (var dataItem in dataItems)
                {
                    var reportFieldModel = new ReportFormFieldModel()
                    {
                        DataItemId = dataItem.Id,
                        Label = dataItem.Label
                    };

                    switch (dataItem)
                    {
                        case SingleSelect singleSelect:
                            // Add label for each option
                            reportFieldModel.Options = singleSelect.KeyValuePairList.Select(x => new ReportFormFieldOptionModel()
                            {
                                Key = x.Key,
                                Label = x.Value
                            }).ToList();
                            break;
                        case MultiSelect multiSelect:
                            // Add label for each option
                            reportFieldModel.Options = multiSelect.KeyValuePairList.Select(x => new ReportFormFieldOptionModel()
                            {
                                Key = x.Key,
                                Label = x.Value
                            }).ToList();
                            break;
                        case CheckBox checkBox:
                        case Number number:
                        case Text text:
                            // No option label needed for these types
                            reportFieldModel.Options.Add(new ReportFormFieldOptionModel()
                            {
                                Key = string.Empty,
                                Label = string.Empty
                            });
                            break;
                        default:
                            continue;
                    }

                    finalModel.FormFields.Add(reportFieldModel);
                }
            }
            
            // Go through all replies
            foreach (var r in replies)
            {
                var caseColumnModel = new ReportCaseColumnModel()
                {
                    Id = r.Id,
                    Date = r.DoneAt
                };
                
                foreach (var element in r.ElementList)
                {
                    if (!(element is CheckListValue checkListValue)) 
                        continue;

                    // Get the values for each field from the reply
                    foreach (var fieldModel in finalModel.FormFields)
                    {
                        if (!(checkListValue.DataItemList.First(x => x.Id == fieldModel.DataItemId) is Field field))
                            continue;

                        var reportCaseFieldModel = new ReportCaseFieldModel()
                        {
                            Id = field.Id
                        };

                        // Fill values for field options
                        foreach (var optionModel in fieldModel.Options)
                        {
                            if (field.KeyValuePairList.Count > 0)
                            {
                                var selectedKeys = field.FieldValues[0].Value.Split('|');

                                reportCaseFieldModel.Values.Add(selectedKeys.Contains(optionModel.Key) ? "+" : "");
                            }
                            else
                            {
                                reportCaseFieldModel.Values.Add(field.FieldValue);
                            }
                        }

                        caseColumnModel.Fields.Add(reportCaseFieldModel);
                    }
                }

                finalModel.CaseColumns.Add(caseColumnModel);
            }

            return finalModel;
        }
    }
}
