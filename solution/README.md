# My solution 

## How to run your solution

To run the provided solution:
1) First of all download the provided server. After some testing it seems that the last version has wildcards for some CORS params that are misbehaving. However, using the previous version of the server with Firefox is working properly.
2) Start the server.
3) Next step is to install the last versions of Node.js and npm.
4) Run npm install and npm start from inside the project.
5) A new browser window (tested successfully on Firefox. Chrome was failing due to the mentioned CORS misconfiguration in the server) will be opened showing the app.
6) First of all we need to load the data from the server. We can see data corresponding with the last 6 or 12 hours.
7) We can see the whole data set in the table, and for the graph, a summary has been provided in order to improve visualization.
8) Table values are editable, so it's possible to change a value in the table and see the corresponding change in the graph.

## How to ensure that future modifications of the code will not break the existing functionality

Future modifications could be extensions or changes of the current functionality.

Due to the modular design implemented, other components extending behaviour can be easily added to the main class without affecting the other already existing components.

If we need a change in the behaviour of an already implemented component, then the change only would impact in the mentioned component, leaving the rest of the application free of undesired lateral effects.

## Description of your solution

I decided to make a simple but functional solution consisting in the usual opinionated React default approach, integrating some other React components in charge of the main page elements.

## Justification for any framework/library choice

1) react: I don't have experience with Angular and Vue, but React is working very well in my current projects. On the other hand, it's modular philosophy gives full freedom for the solution design.
2) recharts: After reviewing some options for this component, I decided to choose this one. It seems solid, is easy to use, and is very configurable.
3) react-table: Choosen basically due to the same reasons that the previous one.
4) react-select: And idem for this.

## Any challenges you faced

The main challenge has been the change in the development work compared with the one that now I'm 
doing in my current projects. For this exercise, a new development from zero is required, however, my current work is more related with the integration of a set of predefined components that, for example, already have the necessary styling, and I just have to worry about implement the right behaviour.

