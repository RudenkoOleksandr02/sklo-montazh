import React from "react";

const ErrorPage: React.FC = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: '20px', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1 >Помилка 404</h1>
            <p>На жаль, сторінку не знайдено.</p>
            <a href="/">Повернутись на головну</a>
        </div>
    );
};

export default ErrorPage;