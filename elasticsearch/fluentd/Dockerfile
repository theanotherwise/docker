FROM fluentd

ARG ELASTICSEARCH_HOSTS1
ARG ELASTICSEARCH_HOSTS2
ARG ELASTICSEARCH_HOSTS3                                                                                                                                                                                                                                                       

USER root

COPY files/fluent.conf /fluentd/etc/fluent.conf

RUN sed -i "s/ELASTICSEARCH_HOSTS1/$ELASTICSEARCH_HOSTS1/g" /fluentd/etc/fluent.conf
RUN sed -i "s/ELASTICSEARCH_HOSTS2/$ELASTICSEARCH_HOSTS2/g" /fluentd/etc/fluent.conf
RUN sed -i "s/ELASTICSEARCH_HOSTS3/$ELASTICSEARCH_HOSTS3/g" /fluentd/etc/fluent.conf

RUN cat /fluentd/etc/fluent.conf
RUN ["gem", "install", "fluent-plugin-elasticsearch", "--no-document"]

USER fluent
