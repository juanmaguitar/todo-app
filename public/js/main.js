$('.remove').on('click', function(e) {

  const idTask = $(this).siblings('.task-id').val()
  const url = `/task/${idTask}`
  const method = 'DELETE'

  $.ajax({ url, method })
    .then( msg => {
      $(this).parent().remove()
      console.log(msg)
    })

})

$('.done').on('click', function(e) {
  const idTask = $(this).siblings('.task-id').val()
  const url = `/task/${idTask}`
  const method = 'PUT'
  const data = { done: true }

  $.ajax({ url, method, data })
    .then( msg => {
      $(this).parent().addClass('task-done')
      console.log(msg);
    })


})