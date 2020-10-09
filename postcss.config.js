const devEnv = {
    plugins: [require("tailwindcss"), require("autoprefixer")],
};
if (process.env.NODE_ENV === "production") {
    devEnv.plugins.push(
        require("@fullhuman/postcss-purgecss")({
            content: ["./src/Components/**/*.jsx", "./src/Components/**/*.jsx"],
            defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
        })
    );
}
module.exports = devEnv;
