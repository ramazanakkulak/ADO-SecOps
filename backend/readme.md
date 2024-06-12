# BACKEND-NodeJS
## Basic Knowledge
What is API?
API (Application Programming Interface) is an interface that allows a software system or application to access data or use its functions with other software systems or applications. It enables communication and integration between software systems through APIs, programming languages, protocols and standards.

What is Docker?
Docker is a software platform. This platform allows applications to run on different operating systems and on different computers, protected from the effects of the environment in which they are run. This is done by creating an executable unit called a "container" that contains all the required dependencies of the application. These containers contain all the resources needed to run the application and provide all the necessary environment for the application to run. With Docker, applications can be run the same way on different operating systems or different computers, making it easier to create and manage the environments necessary for the application to run.

## USAGE
```docker
# requirement
    docker build -t backend .
# start
    docker run --name api -p 5000:80 run backend
```
