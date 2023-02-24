document.addEventListener("DOMContentLoaded", function () {
  
  const warnText = document.querySelector('.noresult');
  const selectSystem = document.querySelector('#SelectPayMentSystem');
  const selectStatus = document.querySelector('#SelectStatusOperation');
  const searchInput = document.querySelector('#operations-search');
  const options = {
    valueNames: ['currency_name','s_operation', 's_system', 's_coming', "s_coming", "s_spending", "s_batch", "s_data", "s_status", "s_description", "s_action"]
  };

  let list = new List('operations', options);


  searchInput.addEventListener('input', (e) => {
    list.search(e.target.value)
  })


  selectSystem.addEventListener('input', (e) => {
    list.filter((item) =>  item.values().currency_name.toLowerCase().includes(e.target.value) && item.values().s_status.toLowerCase().includes(selectStatus.value))
  })

  selectStatus.addEventListener('input', (e) => {
    list.filter((item) =>  item.values().s_status.toLowerCase().includes(e.target.value) && item.values().currency_name.toLowerCase().includes(selectSystem.value))
  })


  list.on('updated', (e) => {
    !e.matchingItems.length ? warnText.style.display = "block" : warnText.style.display = "none"
  })
});