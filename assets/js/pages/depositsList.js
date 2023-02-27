document.addEventListener("DOMContentLoaded", function () {
    const warnText = document.querySelector('.noresult');
    const searchInput = document.querySelector('#deposits-search');
    const options = {
      valueNames: ['id','start_date', 'currency_name', 'avg_price', "last_accrual", "accrual_count", "deposit_plan", "price", "next_accrual", "status"],
      page: 5,
      pagination: [
        {
          paginationClass: 'listjs-pagination', 
          outerWindow: 2
        }
      ]
    };
    let searchText = "", statusVal = "", dateFrom = new Date('01,01,2000'), dateTo = new Date();
    let list = new List('depositsList', options);
    const filterBtn = document.querySelector('#deposit-filter')
    
    flatpickr("#range-datepicker", {
      mode: 'range',
      defaultDate: [new Date(2020, 0, 1), new Date()],
      onClose: (dates) => {
          dateFrom = new Date(dates[0])
          dateTo = new Date(dates[1])
      }
    });
    
    searchInput.addEventListener('change', (e) => {
      searchText = e.target.value.toLowerCase();
      filter()
    })
    
    const myChoice = new Choices('#statusSelectDeposit', {
      searchEnabled: false,
      labelId: 'status-select',
    });

    myChoice.passedElement.element.addEventListener('choice', (e) => {
      statusVal = e.detail.choice.value;
    })

    list.on('updated', (e) => {
      !e.matchingItems.length ? warnText.style.display = "block" : warnText.style.display = "none";

      //remove pagintaion by null search result
      e.matchingItems.length ? document.querySelector(`#depositsList .pagination-wrap`).style.display = "flex" : document.querySelector(`#depositsList .pagination-wrap`).style.display = "none"
    })

    filterBtn.onclick = filter;

    function filter(){
      list.filter(item => {
        const dateVal = new Date(item.values().start_date.slice(0, item.values().start_date.indexOf('<')));
        return (item.values().currency_name.toLowerCase().includes(searchText) 
      || item.values().avg_price.toLowerCase().includes(searchText)
      ||  item.values().last_accrual.toLowerCase().includes(searchText)
      ||  item.values().start_date.toLowerCase().includes(searchText)
      ||  item.values().id.toLowerCase().includes(searchText)
      ||  item.values().last_accrual.toLowerCase().includes(searchText)
      ||  item.values().deposit_plan.toLowerCase().includes(searchText)
      ||  item.values().price.toLowerCase().includes(searchText)
      ||  item.values().next_accrual.toLowerCase().includes(searchText)
      )  && (+dateVal >= +dateFrom && +dateVal <= +dateTo) && item.values().status.toLowerCase().includes(statusVal)
    }) 
    }
  });

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
  

