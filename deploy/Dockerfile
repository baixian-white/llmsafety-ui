ARG NGINX_IMAGE=nginx:stable-alpine
FROM ${NGINX_IMAGE}

ARG SOURCE_REVISION=unknown
ARG SOURCE_SNAPSHOT=unknown
LABEL org.opencontainers.image.title="LLM Safety Teaching Platform" \
      org.opencontainers.image.revision="${SOURCE_REVISION}" \
      org.opencontainers.image.source="https://github.com/baixian-white/llmsafety-ui" \
      io.llmsafety.source-snapshot="${SOURCE_SNAPSHOT}"

COPY deploy/nginx.conf /etc/nginx/nginx.conf
COPY index/ /usr/share/nginx/html/

USER nginx
EXPOSE 8080
HEALTHCHECK --interval=15s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
