    const optionsLevel_1 = {
      valueNames: ['id','username', 'user-email', 'registered-date', "deposited"], //this valueNames for Table Level1
      page: 2,
      pagination: [
        {
          paginationClass: 'pagination', 
          outerWindow: 2
        }
      ]
    };
  
  function buildList(tableId, options, searchInputSelector, warnBlockSelector){
    document.addEventListener("DOMContentLoaded", function () {
      const warnText = document.querySelector(warnBlockSelector);
      const searchInput = document.querySelector(searchInputSelector);
    
      let list = new List(tableId, options);
    
    
      searchInput.addEventListener('input', (e) => {
        list.filter((item) => item.values().username.toLowerCase().includes(e.target.value) ||  item.values()['user-email'].toLowerCase().includes(e.target.value))
      })
    
      list.on('updated', (e) => {
        !e.matchingItems.length ? warnText.style.display = "block" : warnText.style.display = "none";

        //remove pagination by nothing matched
        e.matchingItems.length ? document.querySelector(`#${tableId} .pagination-wrap`).style.display = "flex" : document.querySelector(`#${tableId} .pagination-wrap`).style.display = "none"
      })
    });
  }

  buildList('refListLevel1', optionsLevel_1, '#level1-search', '.noresult.level1')
  buildList('refTableLevel2', optionsLevel_1, '#level2-search', '.noresult.level2')
  buildList('refTableLevel3', optionsLevel_1, '#level3-search', '.noresult.level3')

  //for pagination buttons NEXT and PREV
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


  //reflink
  const link = document.querySelector('#ref-link');
 link.addEventListener('click', (e) => {
  e.preventDefault()
  const address = link.getAttribute('href');
  navigator.clipboard.writeText(address)
  alert(`ссылка скоприрована: ${address}`)
 })