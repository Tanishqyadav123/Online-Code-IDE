FROM ubuntu:20.04

# Updating the ubuntu and upgrading the packages :-
RUN  apt update -y && apt upgrade -y

# Installing curl 
RUN apt install curl -y

#Installing nodejsp
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && apt-get install -y nodejs

# Creating the user name 'coder' :-
RUN useradd -ms /bin/bash coder      

# Customize its terminal :-

RUN echo "export PS1='\w $ '" >> /home/coder/.bashrc 


# Creating the working directory where the actual user's project will be stored
WORKDIR /home/coder/app

# Switch the user from root to coder :-
USER coder    


# To keep the container alive :-
CMD ["tail", "-f", "/dev/null"]

