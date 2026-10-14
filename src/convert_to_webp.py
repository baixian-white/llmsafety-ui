import os
from PIL import Image

def convert_images_to_webp_with_alpha(source_folder, output_folder, quality=92):
    """
    将指定文件夹内的所有图片转换为WebP格式，支持透明通道。

    :param source_folder: 包含源图片的文件夹路径。
    :param output_folder: 用于保存转换后的WebP图片的文件夹路径。
    :param quality: WebP图片的质量（1-100）。
    """
    # 检查并创建输出文件夹
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
        print(f"创建输出文件夹: {output_folder}")

    # 支持的图片文件扩展名
    supported_formats = ('.png', '.jpg', '.jpeg', '.bmp', '.tiff', '.gif')

    # 遍历源文件夹中的所有文件
    for filename in os.listdir(source_folder):
        # 检查文件扩展名
        if not filename.lower().endswith(supported_formats):
            continue

        source_path = os.path.join(source_folder, filename)
        # 构建输出文件路径
        output_filename = os.path.splitext(filename)[0] + '.webp'
        output_path = os.path.join(output_folder, output_filename)

        try:
            # 打开图片文件
            with Image.open(source_path) as img:
                # Pillow 在保存为 WebP 时，如果图像模式为 "RGBA" 或 "LA"，
                # 会自动保留 alpha 通道。我们无需做特殊操作。
                # 'lossless=False' 确保我们使用有损压缩以使 'quality' 参数生效。
                img.save(
                    output_path,
                    'webp',
                    quality=quality,
                    lossless=False,
                    method=6  # 使用 method=6 可以获得更好的压缩率，但耗时稍长 (0-6)
                )
                print(f"成功转换: {filename} -> {output_filename}")

        except Exception as e:
            # 捕获可能的错误，例如文件损坏或格式不支持
            print(f"转换失败: {filename}，错误: {e}")

if __name__ == '__main__':
    # --- 请在这里配置您的文件夹路径 ---

    # 1. 设置您的源图片文件夹路径
    # 例如在 Windows 上: "C:/Users/YourUsername/Desktop/MyPictures"
    # 或者在 Linux/macOS 上: "/home/YourUsername/Pictures"
    SOURCE_DIRECTORY = "../public/guanyuwomen/zhishichanquan/zhuanli"

    # 2. 设置输出文件夹路径 (脚本会自动创建)
    OUTPUT_DIRECTORY = os.path.join(SOURCE_DIRECTORY, "webp_images")

    # --- 配置结束 ---

    # 检查源文件夹路径是否有效
    if not os.path.isdir(SOURCE_DIRECTORY):
        print(f"错误: 源文件夹路径 '{SOURCE_DIRECTORY}' 不存在或不是一个有效的文件夹。")
        print("请确保在脚本中正确设置 'SOURCE_DIRECTORY' 的值。")
    else:
        # 开始转换
        convert_images_to_webp_with_alpha(SOURCE_DIRECTORY, OUTPUT_DIRECTORY, quality=92)
        print("\n所有图片转换完成！")