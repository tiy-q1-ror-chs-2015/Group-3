Yummly.configure do |config|
  config.app_id = Rails.application.secrets.YUMMLY_API_APP_ID
  config.app_key = Rails.application.secrets.YUMMLY_API_APP_KEY
  config.use_ssl = false
end
