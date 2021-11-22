import React from "react";

const Persons = ({ persons, deleteHandler }) => {
    return (
        <div>
            {persons.map((person) => {
                return (
                    <div key={person.id}>
                        <p > 
                            {person.name}
                            <button onClick={() => deleteHandler(person.id)}> 
                                delete 
                            </button>
                        </p> 
                    </div>
                )
            })}
        </div>
    )
}

export default Persons