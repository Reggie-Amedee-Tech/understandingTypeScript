import { Component } from "./base-component.js";
import { Validatable, validate } from '../utils/validator.js';
import { autobind } from '../decorators/autobind.js';
import { projectState } from '../state/project-state.js';


export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
        titleInputElement: HTMLInputElement;
        descriptionInputElement: HTMLInputElement;
        peopleElement: HTMLInputElement;
    
        constructor() {
            super('project-input', 'app', true, 'user-input')
            this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
            this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
            this.peopleElement = this.element.querySelector('#people') as HTMLInputElement;
            this.configure();
    
        }
    
        configure() {
            this.element.addEventListener('submit', this.submitHandler)
        }
    
        private gatherUserInput(): [string, string, number] | undefined {
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptionInputElement.value;
            const enteredPeople = this.peopleElement.value;
    
            const titleValidate: Validatable = {
                value: enteredTitle,
                required: true
            }
    
            const descriptionValidate: Validatable = {
                value: enteredDescription,
                required: true,
                minLength: 5
            }
    
            const peopleValidate: Validatable = {
                value: +enteredPeople,
                required: true,
                min: 1,
                max: 5
            }
    
            if (!validate(titleValidate) || !validate(descriptionValidate) || !validate(peopleValidate)) {
                console.log(titleValidate, peopleValidate, descriptionValidate)
                alert('Invalid Input, please try again!')
                return
            } else {
                return [enteredTitle, enteredDescription, +enteredPeople]
            }
        }
    
        private clearInputs() {
            this.titleInputElement.value = "";
            this.descriptionInputElement.value = "";
            this.peopleElement.value = "";
    
        }
    
    
        @autobind
        private submitHandler(event: Event) {
            event.preventDefault();
            const userInput = this.gatherUserInput();
            console.log(userInput)
    
            if (Array.isArray(userInput)) {
                const [title, description, people] = userInput;
                projectState.addProject(title, description, people);
                console.log(title, description, people)
            }
            console.log(userInput, "YO")
            this.clearInputs()
        }
    
        renderContent() {
    
        }
    }