using System.Threading.Tasks;
using ItemsPlanning.Pn.Abstractions;
using ItemsPlanning.Pn.Infrastructure.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microting.eFormApi.BasePn.Infrastructure.Models.API;

namespace ItemsPlanning.Pn.Controllers
{
    [Authorize]
    public class ItemsListCaseController : Controller
    {
        private readonly IItemsListCaseService _listService;

        public ItemsListCaseController(IItemsListCaseService listService)
        {
            _listService = listService;
        }


        [HttpGet]
        [Route("api/items-planning-pn/list-cases/")]
        public async Task<OperationDataResult<ItemsListCasePnModel>> GetSingleList(ItemListCasesPnRequestModel requestModel)
        {
            return await _listService.GetSingleList(requestModel);
        }

        [HttpGet]
        [Route("api/items-planning-pn/list-case-results")]
        public async Task<OperationDataResult<ItemListPnCaseResultListModel>> GetSingleListResults(ItemListCasesPnRequestModel requestModel)
        {
            return await _listService.GetSingleListResults(requestModel);
        }

        [HttpGet]
        [Route("api/items-planning-pn/list-cases/{id}/{caseId}")]
        public async Task<OperationDataResult<ItemsListPnItemCaseModel>> GetSingleCase(int caseId)
        {
            return await _listService.GetSingleCase(caseId);
        }
    }
}