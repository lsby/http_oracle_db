FROM node:12
ADD . /code
WORKDIR /code
ENV HOME=/code
RUN bash /code/shell/docker/run.sh
CMD bash /code/shell/docker/cmd.sh
