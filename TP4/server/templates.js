exports.tasksPage = function(toDo, resolved, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Form demo</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-blue">
                    <h2>Task List</h2>
                </header>
            
                <form action="newTask" class="w3-container w3-mobile" method="POST">
                    <fieldset class="w3-margin">
                        <legend>New task</legend>
                        <label>Task description:</label>
                        <input class="w3-input w3-round" type="text" name="description" required>
                        <label>Who is responsible:</label>
                        <input class="w3-input w3-round" type="text" name="responsible" required>
                        <label>Date:</label>
                        <input class="w3-input w3-round" type="date" name="dueDate" required>
                    </fieldset>
                    <button class="w3-btn w3-blue w3-mb-2 w3-margin" type="submit">New Task</button>
                </form>

                <!-- tables side by side -->
                <div class="w3-row-padding w3-mobile">
                    <div class="w3-half w3-mobile">
                        <h2>To Do</h2>
                        <table class="w3-table w3-bordered w3-striped w3-border w3-hoverable w3-white w3-mobile">
                            <thead>
                                <tr class="w3-blue">
                                    <th>Description</th>
                                    <th>Responsible</th>
                                    <th>Due Date</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>`

    for(let i = 0; i < toDo.length; i++){
        console.log("toDo[i]",toDo[i])
        pagHTML += `
                                <!-- each row has a form to submit to mark it as done-->
                                <tr>
                                    <td>${toDo[i].description}</td>
                                    <td>${toDo[i].responsible}</td>
                                    <td>${toDo[i].dueDate}</td>
                                    <td>
                                        <form action="deleteToDo" method="POST">
                                            <input type="hidden" name="id" value="${toDo[i].id}">
                                            <button class="w3-btn w3-blue w3-mb-2 w3-margin" type="submit">Delete</button>
                                        </form>
                                    </td>
                                    <td>
                                        <form action="resolve" method="POST">
                                            <input type="hidden" name="id" value="${toDo[i].id}">
                                            <input type="hidden" name="description" value="${toDo[i].description}">
                                            <input type="hidden" name="responsible" value="${toDo[i].responsible}">
                                            <input type="hidden" name="dueDate" value="${toDo[i].dueDate}">
                                            <button class="w3-btn w3-blue w3-mb-2 w3-margin" type="submit">Resolve</button>
                                        </form>
                                    </td>
                                </tr>`
    }

    pagHTML += `
                            </tbody>
                        </table>
                    </div>
                    <div class="w3-half w3-mobile">
                        <h2>Resolved</h2>
                        <table class="w3-table w3-bordered w3-striped w3-border w3-hoverable w3-white w3-mobile">
                            <thead>
                                <tr class="w3-blue">
                                    <th>Description</th>
                                    <th>Responsible</th>
                                    <th>Due Date</th>  
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>`


    for(let i = 0; i < resolved.length; i++){
        pagHTML += `
                                <tr>
                                    <td>${resolved[i].description}</td>
                                    <td>${resolved[i].responsible}</td>
                                    <td>${resolved[i].dueDate}</td>
                                    <td>
                                        <form action="deleteResolved" method="POST">
                                            <input type="hidden" name="id" value="${resolved[i].id}">
                                            <button class="w3-btn w3-blue w3-mb-2 w3-margin" type="submit">Delete</button>
                                        </form>
                                    </td>
                                    <td>
                                        <form action="undo" method="POST">
                                            <input type="hidden" name="id" value="${resolved[i].id}">
                                            <input type="hidden" name="description" value="${resolved[i].description}">
                                            <input type="hidden" name="responsible" value="${resolved[i].responsible}">
                                            <input type="hidden" name="dueDate" value="${resolved[i].dueDate}">
                                            <button class="w3-btn w3-blue w3-mb-2 w3-margin" type="submit">Undo</button>
                                        </form>
                                    </td>
                                </tr>`
    }

    pagHTML += `
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- <footer class="w3-container w3-blue">
                    <h5>Generated by RPCW2023 in ${d} - [<a href="/">Return</a>]</h5>
                </footer> -->
            
            </div>
            `
    return pagHTML
}
