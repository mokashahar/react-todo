import React from "react";
import App from "./App";
import {screen, render, within, cleanup} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Test App", () => {

    afterEach(() => {
        cleanup();
    });

    test("Should add todo item", () => {
        render(<App/>);
        const todoText = "Go to the work";
        addTodo(todoText);
        const todoRow = screen.getByTestId('task-row');
        within(todoRow).getByText(todoText)
    })


    test("Should check todo row", () => {
        render(<App/>);
        const text = "Hello world"
        addTodo(text)
        const checkbox = screen.getByRole('checkbox', {
            name: text
        })
        userEvent.click(checkbox)
        expect(checkbox).toBeChecked()
    })

    test("Should clear all", () => {
        render(<App/>);
        addTodo("first todo")
        addTodo("second todo")
        addTodo("third todo")

        const rows = screen.getAllByTestId('task-row');
        expect(rows.length).toBe(3)

        const clearBtn = screen.getByRole('button', {
            name: /clear/i
        })
        userEvent.click(clearBtn)

        const newRows = screen.queryAllByTestId('task-row');
        expect(newRows.length).toBe(0)
    })
});


async function addTodo(todoText) {
    const input = screen.getByPlaceholderText(/enter to add/i);
    userEvent.type(input, todoText)
    userEvent.keyboard("{enter}")
}
