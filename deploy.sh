gcloud builds submit --project global-application-example --tag "gcr.io/global-application-example/global-apps-frontend" && \
gcloud run deploy "global-apps-frontend" --project global-application-example --region europe-west1 --allow-unauthenticated --image "gcr.io/global-application-example/global-apps-frontend" --platform managed
