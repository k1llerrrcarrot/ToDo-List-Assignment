const baseUrl = "http://localhost:3000/";

const getTasks = async function() {
    try {
        const list = await fetch(baseUrl, {
            headers: {'Content-Type': 'application/json' }
        });
        const jsonList = await list.json();
        return jsonList;
    } catch (err) {
        console.log(err);
    }
}

const postTask = async function(taskString) {
    try {    
        const data = {description: taskString, done: false};
        const newObject = await fetch(baseUrl, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const newJsonObject = await newObject.json();
        return newJsonObject;
    } catch (err) {
        console.log(err);
    }
}

const deleteTask = async function(taskID) {
    try {
        await fetch(baseUrl + taskID, {
            method: "DELETE",
        });
    } catch (err) {
        console.log(err);
    }
}

const putDoneStatus = async function(taskID, checkedStatus) {
    try {
        newData = {done: checkedStatus};

        await fetch(baseUrl + taskID, {
            method: "PUT",
            body: JSON.stringify(newData),
            headers: {
                "Content-Type": "application/json",
            },
        })
    } catch (err) {
        console.log(err);
    }
}

const putEditedTask = async function(taskID, editedTask) {
    try {
        newData = {description: editedTask};

        await fetch(baseUrl + taskID, {
            method: "PUT",
            body: JSON.stringify(newData),
            headers: {
                "Content-Type": "application/json",
            },
        })
    } catch (err) {
        console.log(err);
    }
}