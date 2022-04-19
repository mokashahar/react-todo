import React from "react";
import App from "./App";
import {screen, render, fireEvent, within, waitFor,cleanup} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Test App", () => {

    beforeEach(() => {
        render(<App/>);
    });

    afterEach(() => {
        cleanup();
    });

    test("Should add todo item", () => {
        const todoText = addTodo("Go to the work");
        const todoRow = screen.getByTestId('task-row');
        within(todoRow).getByText(todoText)
    })


    test("Should check todo row",()=>{
        const text="Hello world"
        addTodo(text)
        const checkbox=screen.getByRole('checkbox', {
            name: text
        })
        userEvent.click(checkbox)
        expect(checkbox).toBeChecked()
    })

    test("Should clear all",()=>{
        addTodo("first todo")
        addTodo("second todo")
        addTodo("third todo")

        const rows = screen.getAllByTestId('task-row');
        expect(rows.length).toBe(3)

        const clearBtn=screen.getByRole('button', {
            name: /clear/i
        })
        userEvent.click(clearBtn)

        const newRows = screen.queryAllByTestId('task-row');
        expect(newRows.length).toBe(0)
    })

});

function addTodo(todoText) {
    const input = screen.getByPlaceholderText(/enter to add/i);
    userEvent.type(input, todoText)
    fireEvent.keyDown(input, {key: 'Enter'})
    return todoText;
}
