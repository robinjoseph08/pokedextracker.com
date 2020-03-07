import Modal                        from 'react-modal';
import slug                         from 'slug';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory }               from 'react-router';
import { useRef, useState }         from 'react';

import { AlertComponent } from './alert';
import { ReactGA }        from '../utils/analytics';
import { createDex }      from '../actions/dex';

export function DexCreateComponent ({ isOpen, onRequestClose }) {
  const dispatch = useDispatch();

  const history = useHistory();

  const formRef = useRef(null);

  const games = useSelector(({ games }) => games);
  const gamesById = useSelector(({ gamesById }) => gamesById);
  const session = useSelector(({ session }) => session);

  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [game, setGame] = useState(games[0].id);
  const [regional, setRegional] = useState(!games[0].game_family.national_support);
  const [shiny, setShiny] = useState(false);

  const handleRequestClose = () => {
    setError(null);
    setTitle('');
    setGame(games[0].id);
    setRegional(!games[0].game_family.national_support);
    setShiny(false);
    onRequestClose();
  };

  const handleGameChange = (e) => {
    const newGame = e.target.value;

    if (!gamesById[newGame].game_family.regional_support) {
      setRegional(false);
    }

    if (!gamesById[newGame].game_family.national_support) {
      setRegional(true);
    }

    setGame(newGame);
  };

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      username: session.username,
      payload: { title, shiny, game, regional }
    };

    setError(null);

    try {
      const dex = await dispatch(createDex(payload));
      ReactGA.event({ action: 'create', category: 'Dex' });
      history.push(`/u/${session.username}/${dex.slug}`);
    } catch (err) {
      setError(err.message);
      if (formRef.current) {
        formRef.current.scrollTop = 0;
      }
    }
  };

  if (!isOpen || !games) {
    return null;
  }

  return (
    <Modal
      className="modal"
      overlayClassName="modal-overlay"
      isOpen={isOpen}
      onRequestClose={handleRequestClose}
      contentLabel="Create a New Dex"
    >
      <div className="form" ref={formRef}>
        <h1>Create New Dex</h1>
        <form onSubmit={handleSubmit} className="form-column">
          <AlertComponent message={error} type="error" />
          <div className="form-group">
            <div className="form-note">/u/{session.username}/{slug(title || 'Living Dex', { lower: true })}</div>
            <label htmlFor="dex_title">Title</label>
            <input
              className="form-control"
              name="dex_title"
              id="dex_title"
              type="text"
              maxLength="300"
              required
              placeholder="Living Dex"
              onChange={handleTitleChange}
              value={title}
            />
            <i className="fa fa-asterisk" />
          </div>
          <div className="form-group">
            <label htmlFor="game">Game</label>
            <select
              className="form-control"
              onChange={handleGameChange}
              value={game}
            >
              {games.map((game) => <option key={game.id} value={game.id}>{game.name}</option>)}
            </select>
            <i className="fa fa-chevron-down" />
          </div>
          <div className="form-group">
            <label htmlFor="regional">Regionality</label>
            <div className={`radio ${gamesById[game].game_family.national_support ? '' : 'disabled'}`}>
              <label title={gamesById[game].game_family.national_support ? '' : 'National dex is not supported for this game at this time.'}>
                <input
                  type="radio"
                  name="regional"
                  checked={!regional}
                  disabled={!gamesById[game].game_family.national_support}
                  value="national"
                  onChange={() => setRegional(false)}
                />
                <span className="radio-custom"><span /></span>National
              </label>
            </div>
            <div className={`radio ${gamesById[game].game_family.regional_support ? '' : 'disabled'}`}>
              <label title={gamesById[game].game_family.regional_support ? '' : 'Regional dex is not supported for this game at this time.'}>
                <input
                  type="radio"
                  name="regional"
                  checked={regional}
                  disabled={!gamesById[game].game_family.regional_support}
                  value="regional"
                  onChange={() => setRegional(true)}
                />
                <span className="radio-custom"><span /></span>Regional
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="type"
                  onChange={() => setShiny(false)}
                  checked={!shiny}
                />
                <span className="radio-custom"><span /></span>Normal
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="type"
                  onChange={() => setShiny(true)}
                  checked={shiny}
                />
                <span className="radio-custom"><span /></span>Shiny
              </label>
            </div>
          </div>
          <button className="btn btn-blue" type="submit">Create <i className="fa fa-long-arrow-right" /></button>
        </form>
      </div>
      <p><a className="link" onClick={handleRequestClose}>Go Back</a></p>
    </Modal>
  );
}
