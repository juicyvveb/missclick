document.addEventListener("DOMContentLoaded", function () {
  const warnText = document.querySelector('.noresult');
  const searchInput = document.querySelector('#operations-search');
  const filterBtn = document.querySelector('#operation-filter');
  const infoText =  document.querySelector('#b-info');
  const options = {
    valueNames: ['number', 'currency_name','s_operation', 's_coming', "s_spending", "s_batch", "s_data", "s_status", "s_description", "s_action"],
    page: 10,
      pagination: [
        {
          paginationClass: 'listjs-pagination', 
          outerWindow: 2
        }
      ],
  };
  let searchText = "", statusValue = "", systemValue = "";
  let list = new List('operations', options);

  searchInput.addEventListener('change', (e) => {
    searchText = e.target.value.toLowerCase();
    filter()
  })
  searchInput.addEventListener('input', (e) => {
    if(!e.target.value){
      searchText = e.target.value.toLowerCase();
      filter()
    }
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
    console.log(systemValue)
  })

  setInfo()

  list.on('updated', (e) => {
    !e.matchingItems.length ? warnText.style.display = "block" : warnText.style.display = "none";

    // remove pagination by nothing matched
    e.matchingItems.length ? document.querySelector(`#operations .pagination-wrap`).style.display = "flex" : document.querySelector(`#operations .pagination-wrap`).style.display = "none"
    setInfo()
  })

  filterBtn.onclick = filter
  

  function filter(){
    list.filter(item => (item.values().currency_name.toLowerCase().includes(searchText) 
    || item.values().s_operation.toLowerCase().includes(searchText)
    ||  item.values().s_coming.toLowerCase().includes(searchText)
    ||  item.values().s_spending.toLowerCase().includes(searchText)
    ||  item.values().s_batch.toLowerCase().includes(searchText)
    ||  item.values().s_status.toLowerCase().includes(searchText)
    ||  item.values().s_description.toLowerCase().includes(searchText)
    ||  item.values().s_action.toLowerCase().includes(searchText)
    ) && item.values().s_status.toLowerCase().includes(statusValue) && item.values().currency_name.toLowerCase().includes(systemValue)) 
  }

  //set info for pagination
  function setInfo(){
    const sortedVisibles = list.visibleItems.sort((a,b) => a.elm.getAttribute('data-id')-b.elm.getAttribute('data-id'))
    if(list.matchingItems.length) {infoText.innerHTML = `<span class="${list.matchingItems.length != list.items.length ? 'd-none' : 'd-inline'}">Showing ${sortedVisibles[0].elm.getAttribute('data-id')} to ${sortedVisibles[list.visibleItems.length-1].elm.getAttribute('data-id')} of </span> ${list.matchingItems.length} entries <span class="${list.filtered ? 'd-inline' : 'd-none'}">(filtered from ${list.items.length} total entries)</span>`}
  }
});


// pagination prev and next
document.querySelector(".pagination-next").addEventListener("click", function () {
  if(document.querySelector(".pagination.listjs-pagination").querySelector(".active").nextElementSibling){
     document.querySelector(".pagination.listjs-pagination").querySelector(".active").nextElementSibling.children[0].click()
    return
  }
})

document.querySelector(".pagination-prev").addEventListener("click", function () {
  if(document.querySelector(".pagination.listjs-pagination").querySelector(".active").previousSibling){
    document.querySelector(".pagination.listjs-pagination").querySelector(".active").previousSibling.children[0].click()
    return
  }
});

document.querySelector('.pagination-wrap').addEventListener('click', (e) => {
  e.preventDefault()
})