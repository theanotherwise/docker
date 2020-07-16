FROM ubuntu:focal

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get dist-upgrade -y && \
    apt-get install -y xz-utils rsync make gcc g++ openssl zlib1g zlib1g-dev build-essential  libssl-dev libpq-dev && \
    apt-get install -y libmysqlclient-dev libyaml-dev curl git-core && \
    apt-get install -y build-essential zlib1g-dev libssl-dev libreadline6-dev libyaml-dev libsqlite3-dev tzdata

RUN rm -rf /var/cache/apt/* && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /var/log/apt/*

RUN useradd -m -d /app -s /bin/bash  rails && \
    chown -R rails:rails /app

USER rails

WORKDIR /app

ENV NODE_VERSION=12.18.2

COPY ./archives/node-v${NODE_VERSION}-linux-x64.tar.xz .

RUN mkdir /app/node.js && \
    mkdir /app/node.js/${NODE_VERSION} && \
    ln -s /app/node.js/${NODE_VERSION} /app/node.js/latest

RUN tar -xvf node-v${NODE_VERSION}-linux-x64.tar.xz && \
    rm -f node-v${NODE_VERSION}-linux-x64.tar.xz && \
    rsync -a node-v${NODE_VERSION}-linux-x64/* /app/node.js/12.18.2 && \
    rm -rf node-v${NODE_VERSION}-linux-x64

ENV PATH=/app/node.js/latest/bin:$PATH

ENV YARN_VERSION=1.22.4

COPY ./archives/yarn-v${YARN_VERSION}.tar.gz .

RUN mkdir /app/yarn && \
    mkdir /app/yarn/${YARN_VERSION} && \
    ln -s /app/yarn/${YARN_VERSION} /app/yarn/latest

RUN tar -xvf yarn-v${YARN_VERSION}.tar.gz && \
    rm -f yarn-v${YARN_VERSION}.tar.gz && \
    rsync -a yarn-v${YARN_VERSION}/* /app/yarn/1.22.4 && \
    rm -rf yarn-v${YARN_VERSION}

ENV PATH=/app/yarn/latest/bin:$PATH

ENV RUBY_VERSION=2.7.1

COPY ./archives/ruby-${RUBY_VERSION}.tar.gz .

RUN mkdir /app/ruby && \
    mkdir /app/ruby/${RUBY_VERSION} && \
    ln -s /app/ruby/${RUBY_VERSION} /app/ruby/latest

RUN tar -xvf ruby-${RUBY_VERSION}.tar.gz && \
    rm -f  ruby-${RUBY_VERSION}.tar.gz && \
    cd ruby-${RUBY_VERSION} && ./configure --prefix=/app/ruby/${RUBY_VERSION} && make && make install && cd ../ && \
    rm -rf ruby-${RUBY_VERSION}

ENV PATH=/app/ruby/latest/bin:$PATH

RUN gem install rails sqlite3 --no-document

RUN bundle config --local disable_platform_warnings true

RUN rails new project

WORKDIR /app/project

CMD ["rails", "server", "--binding=0.0.0.0", "--port=8080", "--environment=development", "--using=puma"]