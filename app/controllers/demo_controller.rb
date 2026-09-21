class DemoController < ApplicationController
  def index
  end

  # POST /demo/update_store
  # 返回 Turbo Stream：一条替换页面局部 HTML，一条更新全局 Alpine store
  def update_store
    @name = %w[Alice Bob Carol Dave Eve].sample
    @count = rand(1..99)
    @time = Time.current.strftime("%H:%M:%S")

    respond_to do |format|
      format.turbo_stream
      format.html { redirect_to demo_index_path, notice: "Store updated" }
    end
  end
end
