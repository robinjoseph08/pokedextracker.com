import Modal                                              from 'react-modal';
import PropTypes                                          from 'prop-types';
import slug                                               from 'slug';
import { FontAwesomeIcon }                                from '@fortawesome/react-fontawesome';
import { faAsterisk, faChevronDown, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector }                       from 'react-redux';
import { useHistory }                                     from 'react-router';
import { useRef, useState }                               from 'react';

import { Alert }     from './alert';
import { ReactGA }   from '../utils/analytics';
import { createDex } from '../actions/dex';

export function DexCreate ({ isOpen, onRequestClose }) {
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
      contentLabel="Create a New Dex"
      isOpen={isOpen}
      onRequestClose={handleRequestClose}
      overlayClassName="modal-overlay"
    >
      <div className="form" ref={formRef}>
        <h1>Create New Dex</h1>
        <form className="form-column" onSubmit={handleSubmit}>
          <Alert message={error} type="error" />
          <div className="form-group">
            <div className="form-note">/u/{session.username}/{slug(title || 'Living Dex', { lower: true })}</div>
            <label htmlFor="dex_title">Title</label>
            <input
              className="form-control"
              id="dex_title"
              maxLength="300"
              name="dex_title"
              onChange={handleTitleChange}
              placeholder="Living Dex"
              required
              type="text"
              value={title}
            />
            <FontAwesomeIcon icon={faAsterisk} />
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
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
          <div className="form-group">
            <label htmlFor="regional">Regionality</label>
            <div className={`radio ${gamesById[game].game_family.national_support ? '' : 'disabled'}`}>
              <label title={gamesById[game].game_family.national_support ? '' : 'National dex is not supported for this game at this time.'}>
                <input
                  checked={!regional}
                  disabled={!gamesById[game].game_family.national_support}
                  name="regional"
                  onChange={() => setRegional(false)}
                  type="radio"
                />
                <span className="radio-custom"><span /></span>National
              </label>
            </div>
            <div className={`radio ${gamesById[game].game_family.regional_support ? '' : 'disabled'}`}>
              <label title={gamesById[game].game_family.regional_support ? '' : 'Regional dex is not supported for this game at this time.'}>
                <input
                  checked={regional}
                  disabled={!gamesById[game].game_family.regional_support}
                  name="regional"
                  onChange={() => setRegional(true)}
                  type="radio"
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
                  checked={!shiny}
                  name="type"
                  onChange={() => setShiny(false)}
                  type="radio"
                />
                <span className="radio-custom"><span /></span>Normal
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  checked={shiny}
                  name="type"
                  onChange={() => setShiny(true)}
                  type="radio"
                />
                <span className="radio-custom"><span /></span>Shiny
              </label>
            </div>
          </div>
          <button className="btn btn-blue" type="submit">Create <FontAwesomeIcon icon={faLongArrowAltRight} /></button>
        </form>
      </div>
      <p><a className="link" onClick={handleRequestClose}>Go Back</a></p>
    </Modal>
  );
}

DexCreate.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
};
