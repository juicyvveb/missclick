document.addEventListener("DOMContentLoaded", function () {
  const warnText = document.querySelector('.noresult');
  const searchInput = document.querySelector('#operations-search');
  const form = document.querySelector('#operationsSearchForm');
  const options = {
    valueNames: ['currency_name','s_operation', 's_coming', "s_spending", "s_batch", "s_data", "s_status", "s_description", "s_action"],
    page: 10,
      pagination: [
        {
          paginationClass: 'listjs-pagination', 
          outerWindow: 2
        }
      ]
  };
  let searchText = "", statusValue = "", systemValue = "";
  const filterBtn = document.querySelector('#operation-filter')
  let list = new List('operations', options);
  
  searchInput.addEventListener('input', (e) => {
    searchText = e.target.value.toLowerCase();
    // list.filter((item) => filter(item, searchInput, selectSystem, selectStatus))
  })

  const choiceStatus = new Choices('#SelectStatusOperation', {
    searchEnabled: false,
    labelId: 'status-operation-select',
  });
  choiceStatus.passedElement.element.addEventListener('choice', (e) => {
    statusValue = e.detail.choice.value;
  })

  const choiceSystem = new Choices('#SelectPayMentSystem', {
    searchEnabled: false,
    labelId: 'system-operation-select',
  });
  choiceSystem.passedElement.element.addEventListener('choice', (e) => {
    systemValue = e.detail.choice.value;
  })

  // selectSystem.addEventListener('input', (e) => {
  //   list.filter((item) =>  filter(item))
  // })

  // selectStatus.addEventListener('input', (e) => {
  //   list.filter((item) =>  filter(item))
  // })


  list.on('updated', (e) => {
    !e.matchingItems.length ? warnText.style.display = "block" : warnText.style.display = "none";

    // remove pagination by nothing matched
    e.matchingItems.length ? document.querySelector(`#operations .pagination-wrap`).style.display = "flex" : document.querySelector(`#operations .pagination-wrap`).style.display = "none"
  })

  filterBtn.onclick = () => {
    
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('submit')
    list.filter(item => {
      return (item.values().currency_name.toLowerCase().includes(searchText) 
    || item.values().s_operation.toLowerCase().includes(searchText)
    ||  item.values().s_coming.toLowerCase().includes(searchText)
    ||  item.values().s_spending.toLowerCase().includes(searchText)
    ||  item.values().s_batch.toLowerCase().includes(searchText)
    ||  item.values().s_status.toLowerCase().includes(searchText)
    ||  item.values().s_description.toLowerCase().includes(searchText)
    ||  item.values().s_action.toLowerCase().includes(searchText)
    ) && item.values().s_status.toLowerCase().includes(statusValue) && item.values().currency_name.toLowerCase().includes(systemValue)
  })  
  })
  // function filter(item, search = searchInput, system = selectSystem, status = selectStatus){
  //   return (
  //     item.values()['currency_name'].toLowerCase().includes(search.value.toLowerCase()) || item.values()['s_operation'].toLowerCase().includes(search.value.toLowerCase())
  //   ) && (item.values().s_status.toLowerCase().includes(status.value.toLowerCase()) && item.values().currency_name.toLowerCase().includes(system.value.toLowerCase()))
  // }
});


// pagination prev and next
document.querySelector(".pagination-next").addEventListener("click", function () {
  if(document.querySelector(".pagination.listjs-pagination").querySelector(".active").nextElementSibling){
    // document.querySelector(".pagination.listjs-pagination") && document.querySelector(".pagination.listjs-pagination").querySelector(".active") && document.querySelector(".pagination.listjs-pagination").querySelector(".active").nextElementSibling.children[0].click()
     document.querySelector(".pagination.listjs-pagination").querySelector(".active").nextElementSibling.children[0].click()
    return
  }
})

document.querySelector(".pagination-prev").addEventListener("click", function () {
  if(document.querySelector(".pagination.listjs-pagination").querySelector(".active").previousSibling){
    // document.querySelector(".pagination.listjs-pagination") && document.querySelector(".pagination.listjs-pagination").querySelector(".active") && document.querySelector(".pagination.listjs-pagination").querySelector(".active").previousSibling.children[0].click()
    document.querySelector(".pagination.listjs-pagination").querySelector(".active").previousSibling.children[0].click()
    return
  }
});

document.querySelector('.pagination-wrap').addEventListener('click', (e) => {
  e.preventDefault()
})
