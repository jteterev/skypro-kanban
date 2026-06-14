import Column from '../Column/Column';
import Card from '../Card/Card';

function Main() {
  return (
    <main className="main">
      <div className="container">
        <div className="main__block">
          <div className="main__content">
            <Column title="Без статуса">
              <Card theme="_orange" themeName="Web Design" title="Название задачи" date="30.10.23" />
              <Card theme="_green" themeName="Research" title="Название задачи" date="30.10.23" />
              <Card theme="_orange" themeName="Web Design" title="Название задачи" date="30.10.23" />
              <Card theme="_purple" themeName="Copywriting" title="Название задачи" date="30.10.23" />
              <Card theme="_orange" themeName="Web Design" title="Название задачи" date="30.10.23" />
            </Column>
            <Column title="Нужно сделать">
              <Card theme="_green" themeName="Research" title="Название задачи" date="30.10.23" />
            </Column>
            <Column title="В работе">
              <Card theme="_green" themeName="Research" title="Название задачи" date="30.10.23" />
              <Card theme="_purple" themeName="Copywriting" title="Название задачи" date="30.10.23" />
              <Card theme="_orange" themeName="Web Design" title="Название задачи" date="30.10.23" />
            </Column>
            <Column title="Тестирование">
              <Card theme="_orange" themeName="Web Design" title="Название задачи" date="30.10.23" />
            </Column>
            <Column title="Готово">
              <Card theme="_purple" themeName="Copywriting" title="Название задачи" date="30.10.23" />
              <Card theme="_green" themeName="Research" title="Название задачи" date="30.10.23" />
            </Column>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
