# AdvancedModeler

This project is an example of Camunda 8 Web modeler integrated in an angular 18 front-end :
- showing how to add element templates
- removing some elements 

## Explanations

The steps to build this project were :
- to install [camunda-bpmn-js](https://www.npmjs.com/package/camunda-bpmn-js)
- add some modules to be able to use libraries with typescript in [bpmnio.d.ts](src/bpmnio.d.ts)
- build the [modeler component](src/app/modeler/modeler.component.ts)
- add a [service](src/app/services/elementtemplates.service.ts) that mocks element templates retrieval. In real life, that would get it from some backend app and inject that service in the modeler.
- remove from elements from the list (Service task, Send task, Receive task) by [manipulating CSS](src/styles.css#L25)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
