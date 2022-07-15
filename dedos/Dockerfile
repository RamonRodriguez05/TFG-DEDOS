FROM python:3.8-slim-buster

# The enviroment variable ensures that the python output is set straight
# to the terminal with out buffering it first
ENV PYTHONUNBUFFERED 1

# create root directory for our project in the container
RUN mkdir /dedos

# Set the working directory to /music_service
WORKDIR /dedos

# Copy the current directory contents into the container at /music_service
COPY . .

# Install any needed packages specified in requirements.txt
RUN apt-get update
RUN apt-get install python3-dev build-essential  libssl-dev default-libmysqlclient-dev  -y
RUN pip install -r ./requirements.txt

EXPOSE 8000
EXPOSE 5432

CMD ["bash"]